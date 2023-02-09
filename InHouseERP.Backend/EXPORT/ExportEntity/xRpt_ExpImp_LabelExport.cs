using System;

namespace ExportEntity
{
    public class xRpt_ExpImp_LabelExport
    {
        public string BondRegNo { get; set; }
        public DateTime CreateDate { get; set; }
        public string VatRegNo { get; set; }
        public string BINNo { get; set; }
        public string BondNo { get; set; }
        public DateTime BondDate { get; set; }
        public string ImportBillOfEntryNo { get; set; }
        public DateTime ImportBillOfEntryDate { get; set; }
        public string ImportLCNo { get; set; }
        public DateTime ImportLCDate { get; set; }
        public string ImportPermitNo { get; set; }
        public DateTime ImportPermitDate { get; set; }
        public string ImportInvoiceNo { get; set; }
        public DateTime ImportInvoiceDate { get; set; }
        public decimal ImportInKG { get; set; }
        public decimal ImportAmountInKG { get; set; }
        public decimal TotalImportAmountInKG { get; set; }
        public decimal TotalImportInKG { get; set; }
        public string CommercialInvoiceNo { get; set; }
        public string LcScNo { get; set; }
        public string LcScDate { get; set; }
        public DateTime CommercialInvoiceDate { get; set; }
        public string EpzPermissionNo { get; set; }
        public string EpzPermissionDate { get; set; }
        public DateTime Fromdate { get; set; }
        public DateTime ToDate { get; set; }
        public string BillOfEntryNo { get; set; }
        public string BillOfEntryDate { get; set; }
        public decimal ExportInKG { get; set; }
        public decimal ConsumptionInKG { get; set; }
        public decimal OpeningBalanceInKG { get; set; }
        public decimal Balance { get; set; }
        public decimal TotalExportInKG { get; set; }
        public decimal AmountInKG { get; set; }
        public decimal TotalConsumptionInKG { get; set; }
        public decimal TotalAmountInKg { get; set; }
        public decimal GrandTotalImportInKG { get; set; }
        public decimal GrandTotalImportAmount { get; set; }
        public decimal GrandTotalExportInKG { get; set; }
        public decimal GrandTotalConsumptionInKG { get; set; }
        public decimal GrandTotalExportAmount { get; set; }
        public decimal GrandTotalBalanceInKG { get; set; }
        public string CategoryType { get; set; }
    }
}