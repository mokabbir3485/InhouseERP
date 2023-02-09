using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.POS.PosEntity
{
   public class pos_SalesRegister
    {
        public Int64 SalesOrderId { get; set; }
        public string SalesOrderNo { get; set; }
        public DateTime SalesOrderDate { get; set; }
        public Int32 CompanyId { get; set; }
        public Int32 PreparedBySectionId { get; set; }
        public string CompanyName { get; set; }
        public string SalesOrderType { get; set; }

        public string RefEmployeeName { get; set; }
        public string EmployeeName { get; set; }

        public string AmountWithCurrency { get; set; }
        public Decimal Amount { get; set; }

        public Decimal? ConversionRate { get; set; }
        public Decimal AmountUSD { get; set; }

        public decimal CompanySubTotal { get; set; }
        public decimal TotalAmount { get; set; }
        public Int64 SalesInvoiceId { get; set; }
        public string SalesInvoiceNo { get; set; }
        public DateTime SalesInvoiceDate { get; set; }
        public Decimal SOConversionRate { get; set; }
        public Decimal AmountBDT { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentNo { get; set; }
        public Decimal PaidConversionRate { get; set; }
        public Decimal PaidAmount { get; set; }
        public Decimal PaidAIT { get; set; }
        public Decimal AdjustedAmount { get; set; }
        public Decimal PaidAdditionalCost { get; set; }
        public Decimal TotalPaidAmount { get; set; }
        public Decimal PaidVAT { get; set; }
        public Decimal DueAmount { get; set; }
        public Int32 OverDueByDays { get; set; }



       
    }
}
