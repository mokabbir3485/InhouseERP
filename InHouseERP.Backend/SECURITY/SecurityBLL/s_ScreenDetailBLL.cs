using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class s_ScreenDetailBLL //: IDisposible
    {
        public s_ScreenDetailBLL()
        {
            //s_ScreenDetailDAO = s_ScreenDetail.GetInstanceThreadSafe;
            s_ScreenDetailDAO = new s_ScreenDetailDAO();
        }

        public s_ScreenDetailDAO s_ScreenDetailDAO { get; set; }

        public List<s_ScreenDetail> GetAll()
        {
            try
            {
                return s_ScreenDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_ScreenDetail> GetByScreenId(int screenId)
        {
            try
            {
                return s_ScreenDetailDAO.GetByScreenId(screenId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_ScreenDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return s_ScreenDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<s_ScreenDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return s_ScreenDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(s_ScreenDetail _s_ScreenDetail)
        {
            try
            {
                return s_ScreenDetailDAO.Add(_s_ScreenDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(s_ScreenDetail _s_ScreenDetail)
        {
            try
            {
                return s_ScreenDetailDAO.Update(_s_ScreenDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int screenDetailId)
        {
            try
            {
                return s_ScreenDetailDAO.Delete(screenDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}