using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_RequisitionBLL //: IDisposible
    {
        public inv_RequisitionBLL()
        {
            //inv_RequisitionDAO = inv_Requisition.GetInstanceThreadSafe;
            inv_RequisitionDAO = new inv_RequisitionDAO();
        }

        public inv_RequisitionDAO inv_RequisitionDAO { get; set; }

        public List<inv_Requisition> GetAll()
        {
            try
            {
                return inv_RequisitionDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<IWoForRequestionEntity> GetAllIWOForRequestion()
        {
            try
            {
                return inv_RequisitionDAO.GetAllIWOForRequestion();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        
        public List<inv_Requisition> GetTopForIssue()
        {
            try
            {
                return inv_RequisitionDAO.GetTopForIssue();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_Requisition GetById(long requisitionId)
        {
            try
            {
                return inv_RequisitionDAO.GetAll(requisitionId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_Requisition> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_RequisitionDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_Requisition> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return inv_RequisitionDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(inv_Requisition _inv_Requisition)
        {
            try
            {
                return inv_RequisitionDAO.Add(_inv_Requisition);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_Requisition _inv_Requisition)
        {
            try
            {
                return inv_RequisitionDAO.Update(_inv_Requisition);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_Requisition _inv_Requisition)
        {
            try
            {
                return inv_RequisitionDAO.UpdateApprove(_inv_Requisition);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long requisitionId)
        {
            try
            {
                return inv_RequisitionDAO.Delete(requisitionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetGeneralMaxRequNoByDate(DateTime requDate)
        {
            return inv_RequisitionDAO.GetGeneralMaxRequNoByDate(requDate);
        }

        public DbDataReader GetMaxRequestionNumber()
        {
            try
            {
                return inv_RequisitionDAO.GetMaxRequestionNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetMaxSalesOrderNo()
        {
            try
            {
                return inv_RequisitionDAO.GetMaxReqNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}