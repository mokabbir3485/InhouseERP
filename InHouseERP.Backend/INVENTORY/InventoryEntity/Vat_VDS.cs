using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class Vat_VDS
    {
        public Int64 VDSIssueId { get; set; }
        public Int32 SupplierId { get; set; }
        public decimal TotalVDSAmount { get; set; }
        public Int64 PBId { get; set; }
        public string PBNo { get; set; }
       // public DateTime PBDate { get; set; }
        public DateTime ChallanDate { get; set; }
        public DateTime VDSIssueDate { get; set; }

        //public decimal TotalAmount { get; set; }
        public decimal BillAmount { get; set; }
        // public decimal VatAmount { get; set; }
        public decimal VATAmount { get; set; }
        //public decimal SDAmount { get; set; }
        public decimal VDSAmount { get; set; }
        public string Remarks { get; set; }
        public bool IsLocal { get; set; }
        public int CreatorId { get; set; }
        public int UpdatorId { get; set; }
        public string SupplierName { get; set; }
        public string ChallanNo { get; set; }
        public string BIN { get; set; }
        public string VDSIssueNo { get; set; }
        public decimal TotalVAT { get; set; }
        public int PaymentTypeId { get; set; }
        public string Submitted_Bank { get; set; }
        public string Bank_District { get; set; }
        public string Bank_Branch { get; set; }
        public string CodeNo { get; set; }
        public decimal TotalAmount { get; set; }
        public int PayerBankAccountId { get; set; }
        public DateTime PaymentDate { get; set; }
        public int ChequeTypeId { get; set; }
        public string ChequeNo { get; set; }
        public DateTime ? ChequeDate { get; set; }
        public int MobileBankingServiceId { get; set; }
        public string TransactionNo { get; set; }
        public string MobileNo { get; set; }
        public string MoneyReceiptNo { get; set; }
        public int SubmittedBy { get; set; }
        public string SubmittedTo { get; set; }
        public string PaidFor { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
