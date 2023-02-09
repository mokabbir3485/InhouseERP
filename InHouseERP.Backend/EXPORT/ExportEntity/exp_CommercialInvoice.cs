using System;

namespace ExportEntity
{
    public class exp_CommercialInvoice
    {
        public long CommercialInvoiceId { get; set; }
        public string CommercialInvoiceNo { get; set; }
        public DateTime? CommercialInvoiceDate { get; set; }
        public string PaymentProcessType { get; set; }
        public string CompanyNameWithCINo { get; set; }
        public string LcScNo { get; set; }
        public DateTime? LcScDate { get; set; }
        public string LcScDateStr { get; set; }
        public int? ImporterBankId { get; set; }
        public int? ExporterBankAccountId { get; set; }
        public int? ExporterId { get; set; }
        public string InvoiceIds { get; set; }
        public string ExpNo { get; set; }
        public DateTime? ExpDate { get; set; }
        public string ExpDateStr { get; set; }
        public string ShipmentMode { get; set; }
        public string Covering { get; set; }
        public string CountryOfOrigin { get; set; }
        public long DeliveryChallanId { get; set; }
        public string DcGateNo { get; set; }
        public string VehicleRegNo { get; set; }
        public string MasterContactNo { get; set; }
        public DateTime? MasterContactDate { get; set; }
        public string TermsOfPayment { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string Factory { get; set; }
        public bool IsSubmitted { get; set; }
        public bool IsAmendment { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string DocStatus { get; set; }

        public string CompanyNameBilling { get; set; }
        public string AddressBilling { get; set; }
        public string CompanyNameDelivery { get; set; }

        public string AddressDelivery { get; set; }
        public string BOENumber { get; set; }
        public string ExporterInfo { get; set; }
        public string ExporterBankInfo { get; set; }
        public string PiRefNo { get; set; }
        public string PiRefDate { get; set; }
        public string HsCode { get; set; }
        public string ImporterBankBin { get; set; }
        public string ExporterBankName { get; set; }
        public string ExporterBankAddress { get; set; }
        public string ExporterAccName { get; set; }
        public string ExporterAccNo { get; set; }
        public string ExporterSwiftCode { get; set; }
        public string BranchRouteNo { get; set; }
        public string ImporterName { get; set; }
        public string ImporterDeliveryAddress { get; set; }
        public string ImporterBillingAddress { get; set; }
        public string ImporterBankName { get; set; }
        public string ImporterBankAddress { get; set; }
        public string ImporterSwiftCode { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmount { get; set; }
        public string AmountInWords { get; set; }
        public string PINo { get; set; }
        public string PIDate { get; set; }
        public string ReportNo { get; set; }
        public DateTime ReportDate { get; set; }
        public DateTime ApplicationDate { get; set; }
        public string ApplicationDateStr { get; set; }
        public string BankInfoLabel { get; set; }
        public string BankInfoValue { get; set; }
        public int PaymentProcessTypeId { get; set; }
        public string PaymentProcessTypeName { get; set; }
        public long CiDcChallanId { get; set; }
        public string DcChallanNo { get; set; }
        public bool IsCPT { get; set; }
        public decimal? CPTCost { get; set; }
        public decimal? TotalCPTCost { get; set; }
        public decimal? AmountWithCPT { get; set; }
    }
}