using System;
using System.Collections.Generic;

namespace DbExecutor
{
    public class error_LogBLL //: IDisposible
    {
        public error_LogBLL()
        {
            //error_LogDAO = error_Log.GetInstanceThreadSafe;
            error_LogDAO = new error_LogDAO();
        }

        public error_LogDAO error_LogDAO { get; set; }

        public List<error_Log> GetAll()
        {
            try
            {
                return error_LogDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(error_Log _error_Log)
        {
            try
            {
                return error_LogDAO.Add(_error_Log);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(error_Log _error_Log)
        {
            try
            {
                return error_LogDAO.Update(_error_Log);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long errorId)
        {
            try
            {
                return error_LogDAO.Delete(errorId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}