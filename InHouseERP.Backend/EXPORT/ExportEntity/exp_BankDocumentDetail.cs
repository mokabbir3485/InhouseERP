using System;

namespace ExportEntity
{
    public class exp_BankDocumentDetail
    {
        public long BankDocumentDetailId { get; set; }
        public long BankDocumentId { get; set; }
        public string NameOfDocument { get; set; }
        public string OriginSet { get; set; }
        public int Sets { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}