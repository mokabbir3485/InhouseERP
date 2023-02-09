using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_PriceTypeBLL //: IDisposible
    {
        public ad_PriceTypeBLL()
        {
            //ad_PriceTypeDAO = ad_PriceType.GetInstanceThreadSafe;
            ad_PriceTypeDAO = new ad_PriceTypeDAO();
        }

        public ad_PriceTypeDAO ad_PriceTypeDAO { get; set; }

        public List<ad_PriceType> GetAll()
        {
            try
            {
                return ad_PriceTypeDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_PriceType> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_PriceTypeDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_PriceType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_PriceTypeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_PriceType _ad_PriceType)
        {
            try
            {
                return ad_PriceTypeDAO.Add(_ad_PriceType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_PriceType _ad_PriceType)
        {
            try
            {
                return ad_PriceTypeDAO.Update(_ad_PriceType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int PriceTypeId)
        {
            try
            {
                return ad_PriceTypeDAO.Delete(PriceTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}