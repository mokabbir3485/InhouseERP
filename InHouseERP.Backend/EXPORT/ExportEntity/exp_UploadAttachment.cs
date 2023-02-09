using System;

namespace ExportEntity
{
    public class exp_UploadAttachment
    {
        public long Id { get; set; }
        public string DocType { get; set; }
        public long DocId { get; set; }
        public string Title { get; set; }
        public string Attachment { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}