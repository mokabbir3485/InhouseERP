using System;

namespace ExportEntity
{
    public class xRpt_ExpImp_ImportExportBalance
    {
        public string BondNo { get; set; }
        public string BondDate { get; set; }
        public string BillOfEntryNo { get; set; }
        public string BillOfEntryDate { get; set; }
        public DateTime Fromdate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime CommercialInvoiceDate { get; set; }
        public DateTime StatementDate { get; set; }
        public decimal ImportInQTY { get; set; }
        public decimal ImportAmount { get; set; }
        public decimal ConsumptionInKG { get; set; }
        public decimal ExportInAmount { get; set; }
        public decimal BalanceQTYInKG { get; set; }
        public string Remarks { get; set; }
        public decimal TotalImportInKG { get; set; }
        public decimal TotalImportInAmount { get; set; }
        public decimal TotalExportInKG { get; set; }
        public decimal TotalConsumptionInKG { get; set; }
        public decimal TotalExportAmount { get; set; }
        public decimal TotalBalance { get; set; }
    }
}