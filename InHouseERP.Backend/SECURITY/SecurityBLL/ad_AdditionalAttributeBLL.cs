using System;
using System.Collections.Generic;
using System.Linq;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_AdditionalAttributeBLL //: IDisposible
    {
        public ad_AdditionalAttributeBLL()
        {
            //ad_AdditionalAttributeDAO = ad_AdditionalAttribute.GetInstanceThreadSafe;
            ad_AdditionalAttributeDAO = new ad_AdditionalAttributeDAO();
        }

        public ad_AdditionalAttributeDAO ad_AdditionalAttributeDAO { get; set; }

        public List<ad_AdditionalAttribute> GetAll(int? attributeId = null)
        {
            try
            {
                return ad_AdditionalAttributeDAO.GetAll(attributeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetAllActive()
        {
            try
            {
                var ad_AdditionalAttributeLst = ad_AdditionalAttributeDAO.GetAll();
                return ad_AdditionalAttributeLst.Where(a => a.IsActive).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetAllActiveByIds(string attributeIds)
        {
            try
            {
                return ad_AdditionalAttributeDAO.GetAllActiveByIds(attributeIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetFromSavedType()
        {
            try
            {
                var ad_AdditionalAttributeLst = ad_AdditionalAttributeDAO.GetAll();
                return ad_AdditionalAttributeLst.Where(a => (a.ValueAvailibilityType == 1) & a.IsActive).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_AdditionalAttributeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttribute> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_AdditionalAttributeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_AdditionalAttribute ad_AdditionalAttribute)
        {
            try
            {
                return ad_AdditionalAttributeDAO.Add(ad_AdditionalAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_AdditionalAttribute ad_AdditionalAttribute)
        {
            try
            {
                return ad_AdditionalAttributeDAO.Update(ad_AdditionalAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int addAttId)
        {
            try
            {
                return ad_AdditionalAttributeDAO.Delete(addAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}