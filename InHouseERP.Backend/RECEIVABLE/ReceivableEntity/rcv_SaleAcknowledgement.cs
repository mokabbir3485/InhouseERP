using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableEntity
{
   public class rcv_SaleAcknowledgement
    {
        public Int64 SaleAcknowledgementId { get; set; }
        public string AcknowledgementNo { get; set; }
        public DateTime AcknowledgementDate { get; set; }
        public Int64 SalesInvoiceId { get; set; }
        public int AcknowledgedBy { get; set; }
        public string AcknowledgedByName { get; set; }
        public string CompanyName { get; set; }
        public string SalesInvoiceNo { get; set; }
    }
}
