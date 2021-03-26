using Microsoft.AspNetCore.Http;

namespace centris_test.Models
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
