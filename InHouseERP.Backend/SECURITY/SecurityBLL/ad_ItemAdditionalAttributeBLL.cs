using System;
using System.Collections.Generic;
using System.Data;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ItemAdditionalAttributeBLL //: IDisposible
    {
        public ad_ItemAdditionalAttributeBLL()
        {
            //ad_ItemAdditionalAttributeDAO = ad_ItemAdditionalAttribute.GetInstanceThreadSafe;
            ad_ItemAdditionalAttributeDAO = new ad_ItemAdditionalAttributeDAO();
        }

        public ad_ItemAdditionalAttributeDAO ad_ItemAdditionalAttributeDAO { get; set; }

        public List<ad_ItemAdditionalAttribute> GetAll()
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttribute> GetItemAdditionalAttributeByItemId(int itemId)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetItemAdditionalAttributeByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ad_ControlHead> GetAllControlHead()
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetAllControlHead();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttribute> GetOperationalByItemId(int itemId)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetOperationalByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttribute> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttribute> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ItemAdditionalAttribute _ad_ItemAdditionalAttribute)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.Add(_ad_ItemAdditionalAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ItemAdditionalAttribute _ad_ItemAdditionalAttribute)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.Update(_ad_ItemAdditionalAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int ItemAddAttId)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.Delete(ItemAddAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetAttributeNameByItemId(int itemId)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetAttributeNameByItemId(itemId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ItemAdditionalAttribute> GetByItemIdAndAttributeValueIdConcat(int itemId,
            string attributeValueIdConcat)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetByItemIdAndAttributeValueIdConcat(itemId,
                    attributeValueIdConcat);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetByCombinationLike()
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetByCombinationLike();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetByDepartment(int departmentId)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetByDepartment(departmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetByItemIdAndAttributeValueIdConcatCount(int itemId, string attributeValueIdConcat)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetByItemIdAndAttributeValueIdConcatCount(itemId,
                    attributeValueIdConcat);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetCombinationWithPrice()
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetCombinationWithPrice();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetCombinationByRequisitionId(long requisitionId)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetCombinationByRequisitionId(requisitionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetByDepartmentAllItem(int departmentId)
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetByDepartmentAllItem(departmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetAllBarcode()
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetAllBarcode();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetByCombinationValue()
        {
            try
            {
                return ad_ItemAdditionalAttributeDAO.GetByCombinationValue();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}