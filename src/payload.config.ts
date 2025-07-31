import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { Config } from "./payload-types"

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories' 
import { Products } from './collections/Products'
import { Tags } from './collections/Tags'
import { Tenants } from './collections/Tenants'
import { Orders } from './collections/Orders'
import {  Reviews } from './collections/Reviews'
import { isSuperAdmin } from './lib/access'
//import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { s3Storage } from '@payloadcms/storage-s3';

if (!process.env.S3_BUCKET_NAME) {
  throw new Error('Missing S3_BUCKET_NAME environment variable');
}
if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error('Missing AWS_ACCESS_KEY_ID environment variable');
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('Missing AWS_SECRET_ACCESS_KEY environment variable');
}
if (!process.env.AWS_REGION) {
  throw new Error('Missing AWS_REGION environment variable');
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname,'src'),
    },
    components:{
      beforeNavLinks:["@/components/stripe-verify#StripeVerify"]
    }
  },
  
  collections: [Users, Media, Categories, Products, Tags, Tenants, Orders, Reviews],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({  
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin<Config>({
      collections:{
        products:{},
      },
      tenantsArrayField:{
        includeDefaultField:false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user)
    }),
    
  s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET_NAME,
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
      },
    })

    //vercelBlobStorage({
      //enabled:true,
      //collections:{
       // media:true,
      //},
      //token: process.env.BLOB_READ_WRITE_TOKEN,
    //}),
  ],
})