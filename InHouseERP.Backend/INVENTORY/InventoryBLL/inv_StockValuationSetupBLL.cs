using System;
using System.Collections.Generic;
using System.Linq;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockValuationSetupBLL //: IDisposible
    {
        public inv_StockValuationSetupBLL()
        {
            //inv_StockValuationSetupDAO = inv_StockValuationSetup.GetInstanceThreadSafe;
            inv_StockValuationSetupDAO = new inv_StockValuationSetupDAO();
        }

        public inv_StockValuationSetupDAO inv_StockValuationSetupDAO { get; set; }

        public List<inv_StockValuationSetup> GetAll()
        {
            try
            {
                var lstinv_StockValuationSetup = inv_StockValuationSetupDAO.GetAll();
                //lstinv_StockValuationSetup = lstinv_StockValuationSetup.Where(c => c.ChargeTypeName != "Product Price").ToList();
                return lstinv_StockValuationSetup;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_StockValuationSetup GetCurrent()
        {
            try
            {
                var lstinv_StockValuationSetup = inv_StockValuationSetupDAO.GetAll();
                return lstinv_StockValuationSetup.FirstOrDefault(s => s.IsCurrent);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_StockValuationSetup GetNext()
        {
            try
            {
                var lstinv_StockValuationSetup = inv_StockValuationSetupDAO.GetAll();
                var stkValSetupCurrent = new inv_StockValuationSetup();
                stkValSetupCurrent = lstinv_StockValuationSetup.FirstOrDefault(s => s.IsCurrent);
                return lstinv_StockValuationSetup.FirstOrDefault(s =>
                    s.FinancialCycleId > stkValSetupCurrent.FinancialCycleId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_StockValuationSetup _inv_StockValuationSetup)
        {
            try
            {
                return inv_StockValuationSetupDAO.Add(_inv_StockValuationSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockValuationSetup _inv_StockValuationSetup)
        {
            try
            {
                return inv_StockValuationSetupDAO.Update(_inv_StockValuationSetup);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int ChargeTypeId)
        {
            try
            {
                return inv_StockValuationSetupDAO.Delete(ChargeTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}