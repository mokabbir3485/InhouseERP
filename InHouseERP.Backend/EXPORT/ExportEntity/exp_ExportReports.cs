namespace ExportEntity
{
    public class exp_ExportReports
    {
        public long DataValue { get; set; }
        public string DisplayLabel { get; set; }
        public string CertificateName { get; set; }

        public string ExporterName { get; set; }
        public string ExproterFactoryAddress { get; set; }
        public string ExporterTIN { get; set; }
        public string ExporterBIN { get; set; }
        public string ExporterVatRegNo { get; set; }
        public string Factory { get; set; }
        public int? ExporterBankAccountId { get; set; }
        public int? ExporterId { get; set; }
        public string ExporterEmail { get; set; }
        public string ExporterEmailRef { get; set; }
        public string ImporterName { get; set; }
        public string ImporterBillingAddress { get; set; }
        public string ImporterDeliveryAddress { get; set; }
        public string CompanyNameBilling { get; set; }
        public string ImporterTIN { get; set; }
        public string ImporterBIN { get; set; }
        public string ImporterVatRegNo { get; set; }
        public string TotalGoods { get; set; }
        public string TotalCartons { get; set; }
        public string LcNo { get; set; }
        public string LcDate { get; set; }
        public string ExpNo { get; set; }
        public string ExpDate { get; set; }
        public string MasterContactNo { get; set; }
        public string MasterContactDate { get; set; }

        public string HSCode { get; set; }
        public string Lca { get; set; }
        public string IRC { get; set; }
        public string BbDcNo { get; set; }
        public string LabelNetWeight { get; set; }
        public string LabelGrossWeight { get; set; }
        public string RibbonNetWeight { get; set; }
        public string RibbonGrossWeight { get; set; }
        public string PINo { get; set; }
        public string PIDate { get; set; }
        public string PaymentProcessType { get; set; }
        public int PaymentProcessTypeId { get; set; }
        public string CartonMeasurement { get; set; }
        public string CountryOfOrigin { get; set; }

        //Exp_Chalan Report Property///

        public string BillOfEntryNo { get; set; }
        public string BillOfEntryDate { get; set; }
        public string DcGateNo { get; set; }
        public string DcGateNoDate { get; set; }

        public string InvoiceNo { get; set; }
        public string InvoiceDate { get; set; }
        public string ExporterWeb { get; set; }
        public string ExporterBank { get; set; }
        public string ExporterAccountName { get; set; }
        public string ExporterAccountNo { get; set; }
        public string ExporterSwift { get; set; }
        public string ExporterBranchAddress { get; set; }
        public string EPNo { get; set; }
        public string EPDate { get; set; }
        public string VehicleRegNo { get; set; }

        /// Chalan Details

        public string ItemName { get; set; }

        public decimal Quantity { get; set; }
        public decimal QtyDescription { get; set; }
    }
}