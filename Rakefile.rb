desc "Compiles the js"
task :default => [:build]

desc "compiles"
task :build do
	srcFiles = Dir['src/**/*.js']	
	sh "java -jar compiler/compiler.jar --js #{srcFiles.join(" ")} --js_output_file desteer.js"
end
