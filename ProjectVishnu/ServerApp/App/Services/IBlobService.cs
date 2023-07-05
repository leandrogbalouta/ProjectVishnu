namespace ProjectVishnu.ServerApp.App.Services
{
    public interface IBlobService
    {
        Task UploadBlobsAsync(string directory, List<IFormFile> files);
        IEnumerable<string> ListBlobs(string directory);
        Task<Stream> GetBlobStreamAsync(string directory, string blobName);
        Task<Boolean> DeleteBlobAsync(string directory, string blobName);
    }
}
