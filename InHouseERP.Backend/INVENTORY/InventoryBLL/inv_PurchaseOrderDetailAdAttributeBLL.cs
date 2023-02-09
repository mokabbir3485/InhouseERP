using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_PurchaseOrderDetailAdAttributeBLL //: IDisposible
    {
        public inv_PurchaseOrderDetailAdAttributeBLL()
        {
            //inv_PurchaseOrderDetailAdAttributeDAO = inv_PurchaseOrderDetailAdAttribute.GetInstanceThreadSafe;
            inv_PurchaseOrderDetailAdAttributeDAO = new inv_PurchaseOrderDetailAdAttributeDAO();
        }

        public inv_PurchaseOrderDetailAdAttributeDAO inv_PurchaseOrderDetailAdAttributeDAO { get; set; }

        public List<inv_PurchaseOrderDetailAdAttribute> GetAll()
        {
            try
            {
                return inv_PurchaseOrderDetailAdAttributeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetailAdAttribute> GetByPODetailId(long PODetailId)
        {
            try
            {
                return inv_PurchaseOrderDetailAdAttributeDAO.GetByPODetailId(PODetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetailAdAttribute> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_PurchaseOrderDetailAdAttributeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrderDetailAdAttribute> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_PurchaseOrderDetailAdAttributeDAO.GetPaged(startRecordNo, rowPerPage, whereClause,
                    sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_PurchaseOrderDetailAdAttribute _inv_PurchaseOrderDetailAdAttribute)
        {
            try
            {
                return inv_PurchaseOrderDetailAdAttributeDAO.Add(_inv_PurchaseOrderDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_PurchaseOrderDetailAdAttribute _inv_PurchaseOrderDetailAdAttribute)
        {
            try
            {
                return inv_PurchaseOrderDetailAdAttributeDAO.Update(_inv_PurchaseOrderDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long PODetailAdAttId)
        {
            try
            {
                return inv_PurchaseOrderDetailAdAttributeDAO.Delete(PODetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}