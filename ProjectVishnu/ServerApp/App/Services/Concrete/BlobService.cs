using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure;

namespace ProjectVishnu.ServerApp.App.Services.Concrete
{
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _containerName = "obrascontainer";
        BlobContainerClient _containerClient;

        public BlobService(IConfiguration config)
        {
            _blobServiceClient = new BlobServiceClient(config.GetConnectionString("azureStorage"));
            _containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
            _containerClient.CreateIfNotExists();
        }

        public async Task UploadBlobsAsync(string directory, List<IFormFile> files)
        {
            try
            {
                foreach (IFormFile file in files)
                {
                    BlobClient blobClient = _containerClient.GetBlobClient(directory + "/" + file.FileName);
                    MemoryStream stream = new MemoryStream();

                    using (var fileStream = file.OpenReadStream())
                    {
                        await fileStream.CopyToAsync(stream);
                    }
                    stream.Seek(0, SeekOrigin.Begin);
                    await blobClient.UploadAsync(stream);

                    // Dispose of the MemoryStream after uploading
                    stream.Dispose();
                }
            }
            catch (RequestFailedException e)
            {
                throw e;
            }
        }

        public IEnumerable<string> ListBlobs(string directory)
        {
            List<string> blobNames = new List<string>();

            BlobClient blobClient = _containerClient.GetBlobClient(directory);

            foreach (BlobItem blobItem in _containerClient.GetBlobs(prefix: directory))
            {
                blobNames.Add(blobItem.Name);
            }
            blobNames.RemoveAt(0);
            return blobNames.Select(blob => blob.Split("/")[1]);
        }
        public async Task<Boolean> DeleteBlobAsync(string directory, string blobName)
        {
            try
            {
                BlobClient blobClient = _containerClient.GetBlobClient(directory + "/" + blobName);
                return await blobClient.DeleteIfExistsAsync();
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public async Task<Stream> GetBlobStreamAsync(string directory, string blobName)
        {
            BlobClient blobClient = _containerClient.GetBlobClient(directory + "/" + blobName);

            BlobDownloadInfo download = await blobClient.DownloadAsync();

            if (download == null)
            {
                return null;
            }

            return download.Content;
        }
    }
}
