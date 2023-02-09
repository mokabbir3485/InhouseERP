using System;
using System.Collections.Generic;
using System.Linq;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockValuationTestBLL //: IDisposible
    {
        public inv_StockValuationTestBLL()
        {
            //inv_StockValuationTestDAO = inv_StockValuation.GetInstanceThreadSafe;
            inv_StockValuationTestDAO = new inv_StockValuationTestDAO();
        }

        public inv_StockValuationTestDAO inv_StockValuationTestDAO { get; set; }

        public List<inv_StockValuation> GetAll()
        {
            try
            {
                return inv_StockValuationTestDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_StockValuation GetByItemAndDepartment(int ItemId, int DepartmentId)
        {
            try
            {
                return inv_StockValuationTestDAO.GetByItemAndDepartment(ItemId, DepartmentId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetByItemCode(string itemCode)
        {
            try
            {
                return inv_StockValuationTestDAO.GetByItemCode(itemCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockValuationTest _inv_StockValuationTest)
        {
            try
            {
                return inv_StockValuationTestDAO.Add(_inv_StockValuationTest);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockValuation _inv_StockValuation)
        {
            try
            {
                return inv_StockValuationTestDAO.Update(_inv_StockValuation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateAdd(inv_StockValuation _inv_StockValuation)
        {
            try
            {
                return inv_StockValuationTestDAO.UpdateAdd(_inv_StockValuation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateDeduct(inv_StockValuation _inv_StockValuation)
        {
            try
            {
                return inv_StockValuationTestDAO.UpdateDeduct(_inv_StockValuation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ValuationId)
        {
            try
            {
                return inv_StockValuationTestDAO.Delete(ValuationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}