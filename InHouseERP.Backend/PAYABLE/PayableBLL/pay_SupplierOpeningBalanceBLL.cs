using System;
using System.Collections.Generic;
using PayableDAL;
using PayableEntity;

namespace PayableBLL
{
    public class pay_SupplierOpeningBalanceBLL //: IDisposible
    {
        public pay_SupplierOpeningBalanceBLL()
        {
            //pay_SupplierOpeningBalanceDAO = pay_SupplierOpeningBalance.GetInstanceThreadSafe;
            pay_SupplierOpeningBalanceDAO = new pay_SupplierOpeningBalanceDAO();
        }

        public pay_SupplierOpeningBalanceDAO pay_SupplierOpeningBalanceDAO { get; set; }

        public List<pay_SupplierOpeningBalance> GetAll()
        {
            try
            {
                return pay_SupplierOpeningBalanceDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierOpeningBalance> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return pay_SupplierOpeningBalanceDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<pay_SupplierOpeningBalance> SupplierOpeningBalance_GetBySupplierId(int SupplierId)
        {
            try
            {
                return pay_SupplierOpeningBalanceDAO.SupplierOpeningBalance_GetBySupplierId(SupplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_SupplierOpeningBalance> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pay_SupplierOpeningBalanceDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pay_SupplierOpeningBalance _pay_SupplierOpeningBalance)
        {
            try
            {
                return pay_SupplierOpeningBalanceDAO.Post(_pay_SupplierOpeningBalance);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(pay_SupplierOpeningBalance _pay_SupplierOpeningBalance)
        {
            try
            {
                return pay_SupplierOpeningBalanceDAO.Update(_pay_SupplierOpeningBalance);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long openingBalanceId)
        {
            try
            {
                return pay_SupplierOpeningBalanceDAO.Delete(openingBalanceId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}