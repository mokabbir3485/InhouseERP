using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockIssueDetailBLL //: IDisposible
    {
        public inv_StockIssueDetailBLL()
        {
            //inv_StockIssueDetailDAO = inv_StockIssueDetail.GetInstanceThreadSafe;
            inv_StockIssueDetailDAO = new inv_StockIssueDetailDAO();
        }

        public inv_StockIssueDetailDAO inv_StockIssueDetailDAO { get; set; }

        public List<inv_StockIssueDetail> GetByIssueId(long issueId)
        {
            try
            {
                return inv_StockIssueDetailDAO.GetByIssueId(issueId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_StockIssueDetail _inv_StockIssueDetail)
        {
            try
            {
                return inv_StockIssueDetailDAO.Add(_inv_StockIssueDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long InternalStockIssueDetailAdd(inv_InternalStockIssueDetail _inv_StockIssueDetail)
        {
            try
            {
                return inv_StockIssueDetailDAO.InternalStockIssueDetailAdd(_inv_StockIssueDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       

        public long AddConsume(inv_StockIssueDetail _inv_StockIssueDetail)
        {
            try
            {
                return inv_StockIssueDetailDAO.AddConsume(_inv_StockIssueDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_StockIssueDetail _inv_StockIssueDetail)
        {
            try
            {
                return inv_StockIssueDetailDAO.UpdateApprove(_inv_StockIssueDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}