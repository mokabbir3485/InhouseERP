using System;
using System.Collections.Generic;
using PayableDAL;
using PayableEntity;

namespace PayableEntity
{
    public class pay_SupplierRefundBLL
    {
        public pay_SupplierRefundBLL()
        {
            //pay_SaleRealizationDAO = pay_SaleRealization.GetInstanceThreadSafe;
            pay_SupplierRefundDAO = new pay_SupplierRefundDAO();
        }

        public pay_SupplierRefundDAO pay_SupplierRefundDAO { get; set; }

        public List<pay_SupplierRefund> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pay_SupplierRefundDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(pay_SupplierRefund _pay_SupplierRefund)
        {
            try
            {
                return pay_SupplierRefundDAO.Post(_pay_SupplierRefund);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     

    }
}