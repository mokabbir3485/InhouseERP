using SecurityEntity.POS.PosDAL;
using SecurityEntity.POS.PosEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.POS.PosBLL
{
   public class pos_InvoicePaymentBLL
    {
        public pos_InvoicePaymentBLL()
        {
            pos_InvoicePaymentDAO = new pos_InvoicePaymentDAO();
        }

        public pos_InvoicePaymentDAO pos_InvoicePaymentDAO { get; set; }

        public string Post(pos_InvoicePayment _pos_InvoicePayment)
        {
            try
            {
                return pos_InvoicePaymentDAO.Post(_pos_InvoicePayment);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
