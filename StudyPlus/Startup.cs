using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace StudyPlus
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            Assembly assem = typeof(StudyPlus.Startup).Assembly;
            var diCurrentDirectory = new DirectoryInfo(Environment.CurrentDirectory);

            string wwwPath = diCurrentDirectory.FullName + "\\wwwroot";
            string scriptsPath = wwwPath + "\\Scripts";
            string appsPath = scriptsPath + "\\Apps";
            string componentsPath = scriptsPath + "\\Components";
            string resourcesPath = scriptsPath + "\\Resources";

            //CreateFolder(wwwPath);
            //CreateFolder(scriptsPath);
            //CreateFolder(appsPath);
            //CreateFolder(componentsPath);

            //SaveResource(assem, appsPath, "Apps.js");
            //SaveResource(assem, appsPath, "AppsDeployments.json");
            //SaveResource(assem, appsPath, "AppsIndex.html");
            //SaveResource(assem, appsPath, "jquery.js");

            //SaveResource(assem, componentsPath, "components.json");
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvcCore().AddJsonOptions(options => 
            options.JsonSerializerOptions.PropertyNamingPolicy = null);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
        }
        private void CreateFolder(string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
        }
        private void SaveResource(Assembly assem, string resourceFolder, string resourceName)
        {
            var appsjsStream = assem.GetManifestResourceStream(resourceName);
            var fileStream = File.Create(resourceFolder + "\\" + resourceName);
            appsjsStream.Seek(0, SeekOrigin.Begin);
            appsjsStream.CopyTo(fileStream);
            fileStream.Close();

        }
    }
}
