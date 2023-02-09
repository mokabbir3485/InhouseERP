using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.POS.PosEntity
{
    public class pos_SalesInvoiceTemp
    {
        public long SalesInvoiceId { get; set; }
        public DateTime SalesInvoiceDate { get; set; }
        public string SalesInvoiceNo { get; set; }
        public int CompanyId { get; set; }
        public string DeliveryIds { get; set; }
        public string ManualInvoiceNo { get; set; }
        public bool IsOnCredit { get; set; }
        
    }
}
