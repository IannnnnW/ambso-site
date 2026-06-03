// scripts/migrateLeadCollaborators.js
// Run AFTER deploying all schema changes to Sanity Studio.
// Required env vars:
//   SANITY_PROJECT_ID   — your Sanity project ID
//   SANITY_DATASET      — e.g. "production"
//   SANITY_WRITE_TOKEN  — token with Editor or higher write access

import {createClient} from '@sanity/client'
import {nanoid} from 'nanoid'

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
})

async function migrate() {
  console.log(DRY_RUN ? '🔍 DRY RUN — no writes will be made\n' : '🚀 Running migration\n')

  // Fetch all partners that still have at least one embedded collaborator object
  // (embedded objects have a 'name' field; references have a '_ref' field)
  const partners = await client.fetch(`
    *[_type == "partner" && defined(leadCollaborators) && count(leadCollaborators) > 0]{
      _id,
      name,
      leadCollaborators
    }
  `)

  if (!partners.length) {
    console.log('No partners with leadCollaborators found. Nothing to migrate.')
    return
  }

  console.log(`Found ${partners.length} partner(s) with leadCollaborators\n`)

  let totalCreated = 0
  let totalSkipped = 0
  let totalPatched = 0

  for (const partner of partners) {
    console.log(`Partner: ${partner.name} (${partner._id})`)

    const hasEmbedded = partner.leadCollaborators.some((c) => !c._ref)

    if (!hasEmbedded) {
      console.log('  ↩  All collaborators already migrated, skipping\n')
      totalSkipped += partner.leadCollaborators.length
      continue
    }

    const newRefs = []

    for (const collaborator of partner.leadCollaborators) {
      // Already a reference — keep it as-is
      if (collaborator._ref) {
        console.log(`  ↩  Already a reference: ${collaborator._ref}`)
        newRefs.push({
          _key: collaborator._key || nanoid(),
          _type: 'reference',
          _ref: collaborator._ref,
        })
        totalSkipped++
        continue
      }

      // Build the new collaborator document
      const doc = {
        _type: 'collaborator',
        name: collaborator.name,
        position: collaborator.position,
        partner: {_type: 'reference', _ref: partner._id},
        ...(collaborator.title && {title: collaborator.title}),
        ...(collaborator.bio && {bio: collaborator.bio}),
        ...(collaborator.profileUrl && {profileUrl: collaborator.profileUrl}),
        ...(collaborator.picture && {picture: collaborator.picture}),
      }

      if (DRY_RUN) {
        const fakeId = `collaborator-dry-run-${nanoid(6)}`
        console.log(`  ✦  [DRY RUN] Would create: ${doc.name} → ${fakeId}`)
        newRefs.push({_key: nanoid(), _type: 'reference', _ref: fakeId})
        totalCreated++
        continue
      }

      const created = await client.create(doc)
      console.log(`  ✓  Created collaborator: ${doc.name} (${created._id})`)
      newRefs.push({_key: nanoid(), _type: 'reference', _ref: created._id})
      totalCreated++
    }

    if (!DRY_RUN) {
      await client.patch(partner._id).set({leadCollaborators: newRefs}).commit()
      console.log(`  ✓  Patched ${partner.name} — leadCollaborators now references\n`)
      totalPatched++
    } else {
      console.log(`  ✦  [DRY RUN] Would patch ${partner.name}\n`)
    }
  }

  console.log('─────────────────────────────────')
  console.log(`Collaborator docs created : ${totalCreated}`)
  console.log(`Already references, skipped: ${totalSkipped}`)
  console.log(`Partners patched          : ${totalPatched}`)
  console.log(DRY_RUN ? '\n✅ Dry run complete — no data was changed' : '\n✅ Migration complete')
}

migrate().catch((err) => {
  console.error('\n❌ Migration failed:', err.message)
  process.exit(1)
})
