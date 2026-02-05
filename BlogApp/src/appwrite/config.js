/*url="90tfvg,fhvh8rdsfv,xc kjbdfx "
"hello-world"-slug

status:
//featuresImage:
//doucment_id=slug
bucket_id=storage
*/

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
 }

const service=new Service();
export default service