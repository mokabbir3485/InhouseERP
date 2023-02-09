using System;

namespace ExportEntity
{
    public class exp_Invoice
    {
        public long InvoiceId { get; set; }
        public long InvoiceDetailId { get; set; }
        public string InvoiceNo { get; set; }
        public string PINoPostfix { get; set; }
        public string InvoiceType { get; set; }
        public int ExporterBankId { get; set; }
        public int ImporterBankId { get; set; }
        public string PlaceOfLoading { get; set; }
        public string FinalDestination { get; set; }
        public string TypeOfCarrier { get; set; }
        public string DescriptionOfGoods { get; set; }
        public string MasterContactNo { get; set; }
        public DateTime MasterContactDate { get; set; }
        public string SalesOrderIds { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string Factory { get; set; }
        public int ExporterId { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmount { get; set; }
        public string CompanyName { get; set; }
        public int CompanyId { get; set; } // added for getting company when PI revised get for Edit
        public string SalesOrderNos { get; set; }
        public string DocStatus { get; set; }
        public string SQLMessage { get; set; }
        public bool IsSubmit { get; set; }
        public bool IsAmendment { get; set; }
        public int IsDifferentFormLC { get; set; }
        public int IsChecked { get; set; }

        public string CompanyNameBilling { get; set; }
        public string AddressBilling { get; set; }
        public string CompanyNameDelivery { get; set; }
        public string AddressDelivery { get; set; }
        public string TermsAndCondition { get; set; }

        public int DocRefId { get; set; }
        public int RefEmployeeId { get; set; }

        public int PaymentProcessTypeId { get; set; }
        public string PaymentProcessTypeName { get; set; }
        public bool IsCPT { get; set; }
        public decimal? CPTCost { get; set; }
        public decimal? TotalCPTCost { get; set; }
        public decimal? AmountWithCPT { get; set; }
    }
}