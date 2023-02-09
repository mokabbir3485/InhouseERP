using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableEntity
{
   public class xrpt_rcv_Aging
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public decimal Slot_01 { get; set; }
        public decimal Slot_02 { get; set; }
        public decimal Slot_03 { get; set; }
        public decimal Slot_04 { get; set; }
        public decimal Slot_05 { get; set; }
        public decimal TotalReceivable { get; set; }
        public decimal TotalPayable { get; set; }
        public string SupplierName { get; set; }

    }
}
