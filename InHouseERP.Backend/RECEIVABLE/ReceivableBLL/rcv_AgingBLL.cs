using SecurityEntity.RECEIVABLE.ReceivableDAL;
using SecurityEntity.RECEIVABLE.ReceivableEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.RECEIVABLE.ReceivableBLL
{
   public class rcv_AgingBLL
    {
        public rcv_AgingBLL()
        {
            //rcv_SaleRealizationDAO = rcv_SaleRealization.GetInstanceThreadSafe;
            rcv_AgingDAO = new rcv_AgingDAO();
        }

        public rcv_AgingDAO rcv_AgingDAO { get; set; }


        public List<xrpt_rcv_Aging> AgingReport(Int32 DayRange)
        {
            try
            {
                return rcv_AgingDAO.AgingReport(DayRange);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_rcv_Aging> PayableAgingReport(Int32 DayRange)
        {
            try
            {
                return rcv_AgingDAO.PayableAgingReport(DayRange);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
    }
}
