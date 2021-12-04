const uploadImage=async(data)=>{
    const apiUrl="https://api.cloudinary.com/v1_1/dah8nslpd/image/upload";
    const file=new FormData();
    file.append('file',data);
    file.append("upload_preset","ReadAloud");

    const res=await fetch(apiUrl,{method:"POST",body:file})
    const result=await res.json();
    
   return result.url;
}
export default uploadImage;