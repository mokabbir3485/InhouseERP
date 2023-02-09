using System;
using System.Collections.Generic;
using System.Data;
using PayableDAL;
using PayableEntity;

namespace PayableBLL
{
    public class pay_PurchaseRealizationBLL //: IDisposible
    {
        public pay_PurchaseRealizationBLL()
        {
            //pay_PurchaseRealizationDAO = pay_PurchaseRealization.GetInstanceThreadSafe;
            pay_PurchaseRealizationDAO = new pay_PurchaseRealizationDAO();
        }

        public pay_PurchaseRealizationDAO pay_PurchaseRealizationDAO { get; set; }

        public List<pay_PurchaseRealization> GetAll()
        {
            try
            {
                return pay_PurchaseRealizationDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_PurchaseRealization> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return pay_PurchaseRealizationDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pay_PurchaseRealization> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pay_PurchaseRealizationDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pay_PurchaseRealization _pay_PurchaseRealization)
        {
            try
            {
                return pay_PurchaseRealizationDAO.Add(_pay_PurchaseRealization);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(pay_PurchaseRealization _pay_PurchaseRealization)
        {
            try
            {
                return pay_PurchaseRealizationDAO.Update(_pay_PurchaseRealization);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long realizationId)
        {
            try
            {
                return pay_PurchaseRealizationDAO.Delete(realizationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetSupplierTotals(int financialCycleId, int supplierId)
        {
            try
            {
                return pay_PurchaseRealizationDAO.GetSupplierTotals(financialCycleId, supplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}