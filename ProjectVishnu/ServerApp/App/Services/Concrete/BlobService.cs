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
            try
            {
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
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<string>> ListBlobs(string directory)
        {
            List<string> blobNames = new List<string>();

            BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);

            await foreach (BlobItem blobItem in containerClient.GetBlobsAsync(prefix: directory))
            {
                blobNames.Add(blobItem.Name);
            }

            return blobNames;
        }

        public async Task<Stream> GetBlobStreamAsync(string directory, string blobName)
        {
            BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);

            BlobClient blobClient = containerClient.GetBlobClient(directory + "/" + blobName);

            BlobDownloadInfo download = await blobClient.DownloadAsync();

            if (download == null)
            {
                return null;
            }

            return download.Content;
        }
    }
}
