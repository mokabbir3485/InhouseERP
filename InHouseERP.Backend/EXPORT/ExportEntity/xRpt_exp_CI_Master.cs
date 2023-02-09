using System;

namespace ExportEntity
{
    public class xRpt_exp_CI_Master
    {
        public string ReportDate { get; set; }
        public long CommercialInvoiceId { get; set; }
        public string CommercialInvoiceNo { get; set; }
        public string CommercialInvoiceDate { get; set; }
        public string BankInfoLabel { get; set; }
        public string BankInfoValue { get; set; }


        public string PaymentProcessType { get; set; }
        public string ExpNo { get; set; }
        public string ExpDate { get; set; }
        public string LcScNo { get; set; }
        public string LcScDate { get; set; }
        public string PiRefNo { get; set; }
        public string PiRefDate { get; set; }
        public string HsCodes { get; set; }
        public int ExporterBankId { get; set; }
        public string CountryOfOrigin { get; set; }
        public string Covering { get; set; }
        public string ShipmentMode { get; set; }
        public string MasterContactNo { get; set; }
        public DateTime MasterContactDate { get; set; }
        public string ExportContactNo { get; set; }
        public DateTime ExportContactDate { get; set; }
        public string BangladeshBankDcNo { get; set; }


        public string InvoiceIds { get; set; }
        public string InvoiceDate { get; set; }
        public string Factory { get; set; }
        public int ExporterId { get; set; }
        public int PaymentProcessTypeId { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public decimal Amount { get; set; }
        public string AmountInWords { get; set; }
        public string SalesOrderNos { get; set; }
        public string ExporterName { get; set; }
        public string ExporterFactory { get; set; }
        public string ExporterBIN { get; set; }
        public string ExporterTIN { get; set; }
        public string LcaNo { get; set; }
        public string IrcNo { get; set; }
        public string ApplicantBIN { get; set; }
        public string ApplicantTIN { get; set; }
        public string ExporterVatRegNo { get; set; }
        public string ExporterEmail { get; set; }
        public string ExporterEmailRef { get; set; }
        public string ExporterWeb { get; set; }
        public string ExporterPhone { get; set; }
        public string ExporterMobile { get; set; }
        public string ExporterMobileRef { get; set; }
        public string ExporterBankName { get; set; }
        public string ExporterAccountName { get; set; }
        public string ExporterAccountNo { get; set; }
        public string ExporterSwift { get; set; }
        public string BranchRouteNo { get; set; }
        public string ExporterBranchAddress { get; set; }
        public string ImporterName { get; set; }
        public string ImporterBankName { get; set; }
        public string ImporterBIN { get; set; }
        public string ImporterBankBIN { get; set; }
        public string ImporterBankAddress { get; set; }
        public string ImporterSwift { get; set; }
        public string ImporterBranchAddress { get; set; }
        public string ExporterBankBranchAddress { get; set; }
        public string CompanyNameBilling { get; set; }
        public string ImporterBillAddress { get; set; }
        public string CompanyNameDelivery { get; set; }
        public string ImporterDeliveryAddress { get; set; }
        public string ImporterTIN { get; set; }
        public string ImporterVatRegNo { get; set; }
        public string LabelNetWeight { get; set; }
        public string LabelGrossWeight { get; set; }
        public string RibonNetWeight { get; set; }
        public string RibonGrossWeight { get; set; }
        public string CartonMeasurement { get; set; }
        public string TermsOfPayment { get; set; }
        public string HtmlTable { get; set; }
        public bool HasPoBuyer { get; set; }
        public string ExporterInfo { get; set; }
        public string ExporterBankInfo { get; set; }
        public string VehicleRegNo { get; set; }
        public string BeneficiaryCertificate { get; set; }

        public string TotalCarton { get; set; }
        public bool? IsCPT { get; set; }
        public decimal? CPTCost { get; set; }
        public decimal? TotalCPTCost { get; set; }
        public decimal? AmountWithCPT { get; set; }
    }
}