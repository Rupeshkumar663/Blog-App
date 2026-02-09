/*url="90tfvg,fhvh8rdsfv,xc kjbdfx "
"hello-world"-slug

status:
//featuresImage:
//doucment_id=slug
bucket_id=storage
*/
//query-document nikalne ke liye,sort krne ke liye,filter,limit lgane ke liye
import { Client,ID,Databases,Storage,Query } from "appwrite";
import conf from "../conf/conf";

 export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
       .setEndpoint(conf.appwriteUrl)
       .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
           return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
           )
        } catch(error){
             console.log("Appwrite serive ::createpost::error",error);
        }
    }


    async updatePost(slug,{title,content,featuredImage,status}){
        try{
              return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
              )
        } catch(error){
               console.log("Appwrite serive ::updatepost::error",error);
        }
    }

   
    async deletePost(slug){
        try{
         await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
         )
         return true;
        } catch(error){
             console.log("Appwrite serive ::deletepost::error",error);
        }
    }

    async getPost(slug){
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch(error){
            console.log("Appwrite serive ::getpost::error",error);
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
           return  await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
            100,
            0,

           )
        } catch(error){
            console.log("Appwrite serive ::getposts::error",error);
        }
    }


    async uploadFile(file){
        try {
            return  await this.bucket.createFile(
                conf.appwritebucketId,
                ID.unique(),
                file
            )
        } catch(error){
            console.log("Appwrite serive ::uploadFile::error",error);
            return false;
        }
    }


    async deleteFile(fileId){
        try {
               await this.bucket.deleteFile(
                conf.appwritebucketId,
                fileId
            )
            return true;
        } catch(error){
             console.log("Appwrite serive ::deleteFile::error",error);
            return false;
        }
    }

    getFilePreview(fileId){
     return  this.bucket.getFilePreview(
        conf.appwritebucketId,
        fileId
     )
    }
 }

const service=new Service();
export default service