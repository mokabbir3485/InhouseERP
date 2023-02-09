using System;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_JumboStockValuationBLL
    {
        public inv_JumboStockValuationBLL()
        {
            //inv_StockValuationDAO = inv_StockValuation.GetInstanceThreadSafe;
            inv_JumboStockValuationDAO = new inv_JumboStockValuationDAO();
        }

        public inv_JumboStockValuationDAO inv_JumboStockValuationDAO { get; set; }

        public int Post(inv_JumboStockValuation _inv_JumboStockValuation)
        {
            try
            {
                return inv_JumboStockValuationDAO.Post(_inv_JumboStockValuation);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int PostJumboValuationLedger(inv_JumboStockValuationLedger _inv_JumboStockValuationLedger)
        {
            try
            {
                return inv_JumboStockValuationDAO.PostJumboValuationLedger(_inv_JumboStockValuationLedger);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}