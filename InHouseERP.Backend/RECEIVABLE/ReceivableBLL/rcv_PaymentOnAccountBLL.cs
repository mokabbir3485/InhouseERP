using System;
using System.Collections.Generic;
using System.Data;
using ReceivableDAL;
using ReceivableEntity;

namespace ReceivableBLL
{
    public class rcv_PaymentOnAccountBLL //: IDisposible
    {
        public rcv_PaymentOnAccountBLL()
        {
            //rcv_PaymentOnAccountDAO = rcv_PaymentOnAccount.GetInstanceThreadSafe;
            rcv_PaymentOnAccountDAO = new rcv_PaymentOnAccountDAO();
        }

        public rcv_PaymentOnAccountDAO rcv_PaymentOnAccountDAO { get; set; }

        public List<rcv_PaymentOnAccount> GetAll()
        {
            try
            {
                return rcv_PaymentOnAccountDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_PaymentOnAccount> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return rcv_PaymentOnAccountDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Post(rcv_PaymentOnAccount rcv_PaymentOnAccount)
        {
            try
            {
                return rcv_PaymentOnAccountDAO.Post(rcv_PaymentOnAccount);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_PaymentOnAccount> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_PaymentOnAccountDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public string GetMaxCompanyPaymentOnAccount(DateTime reqDate)
        {
            try
            {
                return rcv_PaymentOnAccountDAO.GetMaxCompanyPaymentOnAccount(reqDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
