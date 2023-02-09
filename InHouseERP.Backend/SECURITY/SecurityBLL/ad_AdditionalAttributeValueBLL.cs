using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_AdditionalAttributeValueBLL //: IDisposible
    {
        public ad_AdditionalAttributeValueBLL()
        {
            //ad_AdditionalAttributeValueDAO = ad_AdditionalAttributeValue.GetInstanceThreadSafe;
            ad_AdditionalAttributeValueDAO = new ad_AdditionalAttributeValueDAO();
        }

        public ad_AdditionalAttributeValueDAO ad_AdditionalAttributeValueDAO { get; set; }

        public List<ad_AdditionalAttributeValue> GetAll()
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttributeValue> GetByAttributeId(int attributeId)
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.GetByAttributeId(attributeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttributeValue> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_AdditionalAttributeValue> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_AdditionalAttributeValue _ad_AdditionalAttributeValue)
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.Add(_ad_AdditionalAttributeValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddWithAttributeName(ad_AdditionalAttributeValue _ad_AdditionalAttributeValue)
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.AddWithAttributeName(_ad_AdditionalAttributeValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_AdditionalAttributeValue _ad_AdditionalAttributeValue)
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.Update(_ad_AdditionalAttributeValue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int attributeValueId)
        {
            try
            {
                return ad_AdditionalAttributeValueDAO.Delete(attributeValueId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}