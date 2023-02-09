using System;

namespace ExportEntity
{
    public class xRpt_exp_PI_Master
    {
        public long InvoiceId { get; set; }
        public string InvoiceNo { get; set; }
        public string PINoPostfix { get; set; }
        public string InvoiceType { get; set; }
        public int ExporterBankId { get; set; }
        public int PaymentProcessTypeId { get; set; }
        public string PlaceOfLoading { get; set; }
        public string FinalDestination { get; set; }
        public string TypeOfCarrier { get; set; }
        public string DescriptionOfGoods { get; set; }
        public string MasterContactNo { get; set; }
        public DateTime MasterContactDate { get; set; }
        public string SalesOrderIds { get; set; }
        public string InvoiceDate { get; set; }
        public string Factory { get; set; }
        public int ExporterId { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public decimal Amount { get; set; }
        public string AmountInWords { get; set; }
        public string SalesOrderNos { get; set; }
        public string ExporterName { get; set; }
        public string ExporterFactory { get; set; }
        public string ExporterTIN { get; set; }
        public string ExporterBIN { get; set; }
        public string ExporterVatRegNo { get; set; }
        public string ExporterEmail { get; set; }
        public string ExporterEmailRef { get; set; }
        public string ExporterWeb { get; set; }
        public string ExporterPhone { get; set; }
        public string ExporterMobile { get; set; }
        public string ExporterMobileRef { get; set; }
        public string ExporterBank { get; set; }
        public string ExporterAccountName { get; set; }
        public string ExporterAccountNo { get; set; }
        public string ExporterSwift { get; set; }
        public string BranchRouteNo { get; set; }
        public string ExporterBranchAddress { get; set; }
        public string ImporterName { get; set; }
        public string CompanyNameBilling { get; set; }
        public string AddressBilling { get; set; }
        public string CompanyNameDelivery { get; set; }
        public string AddressDelivery { get; set; }
        public string ImporterTIN { get; set; }
        public string ImporterVatRegNo { get; set; }
        public string LabelNetWeight { get; set; }
        public string LabelGrossWeight { get; set; }
        public string RibonNetWeight { get; set; }
        public string RibonGrossWeight { get; set; }
        public string CartonMeasurement { get; set; }
        public string TermsAndCondition { get; set; }
        public string HtmlTable { get; set; }
        public bool HasPoBuyer { get; set; }
        public bool IsCPT { get; set; }
        public decimal? CPTCost { get; set; }
        public decimal? TotalCPTCost { get; set; }
        public decimal? AmountWithCPT { get; set; }
    }
}