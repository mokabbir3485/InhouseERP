using System;
using System.Collections.Generic;
using System.Data;
using PayableDAL;
using PayableEntity;

namespace PayableBLL
{
    public class pay_SupplierAdvanceBLL //: IDisposible
    {
        public pay_SupplierAdvanceBLL()
        {
            //pay_SupplierAdvanceDAO = pay_SupplierAdvance.GetInstanceThreadSafe;
            pay_SupplierAdvanceDAO = new pay_SupplierAdvanceDAO();
        }

        public pay_SupplierAdvanceDAO pay_SupplierAdvanceDAO { get; set; }

        public List<pay_SupplierAdvance> GetAll()
        {
            try
            {
                return pay_SupplierAdvanceDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierAdvance> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return pay_SupplierAdvanceDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierAdvance> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pay_SupplierAdvanceDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(pay_SupplierAdvance _pay_SupplierAdvance)
        {
            try
            {
                return pay_SupplierAdvanceDAO.Post(_pay_SupplierAdvance);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Int64 GetMaxSupAdvancedNo()
        {
            try
            {
                return pay_SupplierAdvanceDAO.GetMaxSupAdvancedNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public int Update(pay_SupplierAdvance _pay_SupplierAdvance)
        //{
        //    try
        //    {
        //        return pay_SupplierAdvanceDAO.Update(_pay_SupplierAdvance);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public int Delete(long advanceId)
        {
            try
            {
                return pay_SupplierAdvanceDAO.Delete(advanceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable CheckVoucherNoExists(string voucherNo)
        {
            try
            {
                return pay_SupplierAdvanceDAO.CheckVoucherNoExists(voucherNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}