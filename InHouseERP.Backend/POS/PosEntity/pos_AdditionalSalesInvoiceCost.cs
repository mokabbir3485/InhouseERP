using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.POS.PosEntity
{
   public class pos_AdditionalSalesInvoiceCost
    {
        public int Id { get; set; }
        public Int64 SalesInvoiceId { get; set; }
        public string CostPurpose { get; set; }
        public decimal Amount { get; set; }
        public string SalesInvoiceNo { get; set; }
    }
}
