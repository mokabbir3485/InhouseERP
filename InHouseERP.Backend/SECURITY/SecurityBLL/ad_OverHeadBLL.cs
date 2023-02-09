using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_OverHeadBLL //: IDisposible
    {
        public ad_OverHeadBLL()
        {
            //ad_OverHeadDAO = ad_OverHead.GetInstanceThreadSafe;
            ad_OverHeadDAO = new ad_OverHeadDAO();
        }

        public ad_OverHeadDAO ad_OverHeadDAO { get; set; }

        public List<ad_OverHead> GetAll()
        {
            try
            {
                return ad_OverHeadDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_OverHead> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_OverHeadDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_OverHead> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_OverHeadDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_OverHead _ad_OverHead)
        {
            try
            {
                return ad_OverHeadDAO.Add(_ad_OverHead);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_OverHead _ad_OverHead)
        {
            try
            {
                return ad_OverHeadDAO.Update(_ad_OverHead);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int OverHeadId)
        {
            try
            {
                return ad_OverHeadDAO.Delete(OverHeadId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}