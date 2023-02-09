using System;
using System.Collections.Generic;
using System.Linq;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockValuationAttributeBLL //: IDisposible
    {
        public inv_StockValuationAttributeBLL()
        {
            //inv_StockValuationAttributeDAO = inv_StockValuationAttribute.GetInstanceThreadSafe;
            inv_StockValuationAttributeDAO = new inv_StockValuationAttributeDAO();
        }

        public inv_StockValuationAttributeDAO inv_StockValuationAttributeDAO { get; set; }

        public List<inv_StockValuationAttribute> GetAll()
        {
            try
            {
                return inv_StockValuationAttributeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_StockValuationAttribute GetByItemAndUnitAndDepartment(int itemId, int unitId,
            int? departmentId = null)
        {
            try
            {
                return inv_StockValuationAttributeDAO.GetByItemAndUnitAndDepartment(itemId, unitId, departmentId)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockValuationAttribute> GetByDepartmentAndItemAddAttId(int departmentId, string itemAddAttId)
        {
            try
            {
                return inv_StockValuationAttributeDAO.GetByDepartmentAndItemAddAttId(departmentId, itemAddAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetCurrentStockByItemCode(string itemCode)
        {
            try
            {
                return inv_StockValuationAttributeDAO.GetCurrentStockByItemCode(itemCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            try
            {
                return inv_StockValuationAttributeDAO.Add(_inv_StockValuationAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            try
            {
                return inv_StockValuationAttributeDAO.Update(_inv_StockValuationAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateAdd(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            try
            {
                return inv_StockValuationAttributeDAO.UpdateAdd(_inv_StockValuationAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateDeduct(inv_StockValuationAttribute _inv_StockValuationAttribute)
        {
            try
            {
                return inv_StockValuationAttributeDAO.UpdateDeduct(_inv_StockValuationAttribute);
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
                return inv_StockValuationAttributeDAO.Delete(ValuationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}