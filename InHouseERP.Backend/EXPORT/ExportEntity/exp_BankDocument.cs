using System;

namespace ExportEntity
{
    public class exp_BankDocument
    {
        public long BankDocumentId { get; set; }
        public long CommercialInvoiceId { get; set; }
        public string CommercialInvoiceNo { get; set; }
        public string CompanyNameWithCINo { get; set; }
        public DateTime? CommercialInvoiceDate { get; set; }
        public string CompanyNameBilling { get; set; }
        public string BankName { get; set; }
        public string BankApplicationTo { get; set; }
        public string BankDocumentToDepartment { get; set; }
        public DateTime AppDate { get; set; }
        public long BankDocumentDetailId { get; set; }
        public string ApplicationSubject { get; set; }
        public string LcScNo { get; set; }
        public DateTime lcDate { get; set; }

        public string NameOfDocument { get; set; }
        public string OriginSet { get; set; }
        public int Sets { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}