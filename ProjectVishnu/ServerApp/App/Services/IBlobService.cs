namespace ProjectVishnu.ServerApp.App.Services
{
    public interface IBlobService
    {
        Task UploadBlobsAsync(string directory, List<IFormFile> files);
    }
}
