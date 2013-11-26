desc "Builds minified and unminified js, as well as documentation."
task :default => ['build:debug','build:release',"doc:js_doc"]

namespace :build do
	desc "Compiles minified js file."
	task :release do
		srcFiles = Dir['src/**/*.js']	
		sh "java -jar build_support/compiler.jar --js #{srcFiles.join(" ")} --js_output_file desteer.min.js"
	end

	desc "Compiles unminified js file."
	task :debug do
		srcFiles = Dir['src/**/*.js']	
		sh "java -jar build_support/compiler.jar --js #{srcFiles.join(" ")} --compilation_level WHITESPACE_ONLY --formatting PRETTY_PRINT --js_output_file desteer.js"
	end
end

task :run => ["run:default"]

namespace :run do
	task :default do
		sh 'start chrome ' + ENV['pwd'] + '/example/demo.html'
	end
end

namespace :doc do
	desc "Builds the documentation."
	task :js_doc do
		sh "build_support/jsdoc/jsdoc -c build_support/jsdoc.conf.json"
	end
end


