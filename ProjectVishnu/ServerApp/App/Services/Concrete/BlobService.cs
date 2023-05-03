using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _containerName = "obrascontainer";

        public BlobService(IConfiguration config)
        {
            _blobServiceClient = new BlobServiceClient(config.GetConnectionString("azureStorage"));
        }

        public async Task UploadBlobsAsync(string directory, List<IFormFile> files)
        {
            try{
                BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);

                foreach (IFormFile file in files)
                {
                    BlobClient blobClient = containerClient.GetBlobClient(directory + "/" + file.FileName);

                    using (var stream = new MemoryStream())
                    {
                        using (var fileStream = file.OpenReadStream())
                        {
                            await fileStream.CopyToAsync(stream);
                        }
                        stream.Seek(0, SeekOrigin.Begin);
                        await blobClient.UploadAsync(stream);
                    }
                }
            }catch(Exception e){
                throw e;
            }

            
        }
    }
}
