using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockIssueDetailAdAttributeBLL //: IDisposible
    {
        public inv_StockIssueDetailAdAttributeBLL()
        {
            //inv_StockIssueDetailAdAttributeDAO = inv_StockIssueDetailAdAttribute.GetInstanceThreadSafe;
            inv_StockIssueDetailAdAttributeDAO = new inv_StockIssueDetailAdAttributeDAO();
        }

        public inv_StockIssueDetailAdAttributeDAO inv_StockIssueDetailAdAttributeDAO { get; set; }

        public List<inv_StockIssueDetailAdAttribute> GetByIssueDetailId(long issueDetailId)
        {
            try
            {
                return inv_StockIssueDetailAdAttributeDAO.GetByIssueDetailId(issueDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssueDetailAdAttribute> GetByDepartmentAndItemId(int departmentId, int itemId)
        {
            try
            {
                return inv_StockIssueDetailAdAttributeDAO.GetByDepartmentAndItemId(departmentId, itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_StockIssueDetailAdAttribute _inv_StockIssueDetailAdAttribute)
        {
            try
            {
                return inv_StockIssueDetailAdAttributeDAO.Add(_inv_StockIssueDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}