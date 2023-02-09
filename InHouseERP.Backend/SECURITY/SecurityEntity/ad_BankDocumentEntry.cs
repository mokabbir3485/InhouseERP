using System;

namespace SecurityEntity
{
    public class ad_BankDocumentEntry
    {
        public long BankDocumentEntryId { get; set; }
        public long BankAccountId { get; set; }
        public string NameOfDocument { get; set; }
        public string OriginSet { get; set; }
        public string Sets { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}